// 规则集通用配置
const ruleProviderCommon = {
    "type": "http",
    "format": "text",
    "interval": 86400,
    "behavior": "classical"
};

// 策略组通用配置
const groupBaseOption = {
    "interval": 300,
    "url": "http://1.1.1.1/generate_204",
    "max-failed-times": 2,
};

// 程序入口
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 覆盖通用配置
    config["mixed-port"] = "7890";
    config["tcp-concurrent"] = true;
    config["allow-lan"] = true;
    config["ipv6"] = false;
    config["log-level"] = "info";
    config["unified-delay"] = "true";
    config["find-process-mode"] = "strict";
    config["global-client-fingerprint"] = "chrome";

    // 缓存
    // config["profile"] = {
    //   "store-selected": true,
    //   "store-fake-ip": true,
    // };

    // 覆盖 dns 配置
    config["dns"] = {
        "enable": true,
        "prefer-h3": true,
        "ipv6": false,
        "listen": ":1053",
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com", "+.market.xiaomi.com"],
        "default-nameserver": ["223.5.5.5", "119.29.29.29"],
        "nameserver": ["https://dns.alidns.com/dns-query#h3=true"]
    };

    // 覆盖 geodata 配置
    // config["geodata-mode"] = true;
    config["geox-url"] = {
        "geoip": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
        "geosite": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
        "mmdb": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"
    };

    // 覆盖 sniffer 配置
    config["sniffer"] = {
        "enable": true,
        "parse-pure-ip": true,
        "force-dns-mapping": true,
        "override-destination": false,
        "sniff": {
            "TLS": {
                "ports": ["443", "8443"]
            },
            "HTTP": {
                "ports": ["80", "8080-8880"],
                "override-destination": true
            },
            "QUIC": {
                "ports": ["443", "8443"]
            }
        }
    };

    // 覆盖 tun 配置
    config["tun"] = {
        "enable": true,
        "stack": "mixed",
        "dns-hijack": ["any:53"],
        "auto-route": true
    };

    // 覆盖策略组
    config["proxy-groups"] = [
        {
            ...groupBaseOption,
            "name": "Proxy",
            "type": "select",
            "proxies": ["HK", "TW", "SG"],
            "icon": "https://github.com/Orz-3/face/raw/master/Global.png"
        },
        {
            ...groupBaseOption,
            "name": "Crypto",
            "type": "select",
            "proxies": ["HK", "TW", "SG"],
            "icon": "https://github.com/Orz-3/face/raw/master/Scholar.png"
        },
        {
            ...groupBaseOption,
            "name": "Chat",
            "type": "select",
            "proxies": ["HK", "TW", "SG"],
            "icon": "https://github.com/Orz-3/face/raw/master/Music.png"
        },
        // 地区分组
        {
            ...groupBaseOption,
            "name": "HK",
            "type": "load-balance",
            "tolerance": 0,
            "include-all": true,
            "filter": "((🇭🇰)|(港)|(Hong)|(HK))",
            "icon": "https://github.com/Orz-3/face/raw/master/HK.png"
        },
        {
            ...groupBaseOption,
            "name": "TW",
            "type": "load-balance",
            "tolerance": 0,
            "include-all": true,
            "filter": "((🇨🇳)|(台)|(Tai)|(TW))",
            "icon": "https://github.com/Orz-3/face/raw/master/TW.png"
        },
        {
            ...groupBaseOption,
            "name": "SG",
            "type": "load-balance",
            "tolerance": 0,
            "include-all": true,
            "filter": "((🇸🇬)|(新)|(Singapore)|(SG))",
            "icon": "https://github.com/Orz-3/face/raw/master/SG.png"
        }
    ];

    // 覆盖规则集
    config["rule-providers"] = {
        "Crypto": {
            ...ruleProviderCommon,
            "url": "https://github.com/blackmatrix7/ios_rule_script/raw/master/rule/Clash/Crypto/Crypto.list",
            "path": "./rule/Crypto.list"
        },
        "Apple": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Apple.list",
            "path": "./rules/Apple.list"
        },
        "Telegram": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
            "path": "./rules/Telegram.list"
        },
        "Emby": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Emby.list",
            "path": "./rules/Emby.list"
        },
        "Microsoft": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list",
            "path": "./rules/Microsoft.list"
        },
        "Lan": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
            "path": "./rules/Lan.list"
        },
        "ProxyGFW": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list",
            "path": "./rules/ProxyGFW.list"
        },
        "ChinaIP": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaIP.list",
            "path": "./rules/ChinaIP.list"
        }
    };

    // 覆盖规则
    config["rules"] = [
        "RULE-SET,Crypto,Crypto",
        "RULE-SET,Apple,DIRECT",
        "RULE-SET,Telegram,Chat",
        "RULE-SET,Emby,Proxy",
        "RULE-SET,Microsoft,DIRECT",
        "RULE-SET,ChinaIP,DIRECT",
        "RULE-SET,ProxyGFW,Proxy",
        "RULE-SET,Lan,DIRECT",
        "GEOIP,cn,DIRECT",
        "MATCH,Proxy"
    ];

    // 返回修改后的配置
    return config;
}