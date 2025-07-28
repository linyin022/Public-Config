
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

const dnsConfig = {
    "enable": true,
    "prefer-h3": true,
    "ipv6": false,
    "listen": ":1053",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com", "+.market.xiaomi.com"],
    "default-nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver": ["https://158170-f84kj6wi9rz7qb0x.alidns.com/dns-query#h3=true"],
    "proxy-server-nameserver": ["tls://8.8.8.8", "tls://1.1.1.1"],
    /**
     * 这里对域名解析进行分流
     * 国内ip和域名分流到国内dns
     */
    "nameserver-policy": {
        "geosite:private": "system",
        "geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn": ["223.5.5.5", "119.29.29.29"]
    }
}

const geoData = {
    "geoip": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
    "geosite": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    "mmdb": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"
}

const sniffer = {
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
}

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
    config["dns"] = dnsConfig;

    // 覆盖 geodata 配置
    // config["geodata-mode"] = true;
    config["geox-url"] = geoData;

    // 覆盖 sniffer 配置
    config["sniffer"] = sniffer;

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
            "name": "Proxies",
            "type": "select",
            "icon": "https://github.com/Orz-3/face/raw/master/Global.png",
            "include-all": true
        },
        {
            ...groupBaseOption,
            "name": "Telegram",
            "type": "select",
            "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Telegram.png",
            "include-all": true
        },
        {
            ...groupBaseOption,
            "name": "AI",
            "type": "select",
            "icon": "https://raw.githubusercontent.com/tugepaopao/Image-Storage/master/cartoon/Cute/%23.png",
            "include-all": true
        },
        {
            ...groupBaseOption,
            "name": "Crypto",
            "type": "select",
            "icon": "https://github.com/Orz-3/face/raw/master/Scholar.png",
            "include-all": true
        }
    ];

    // 覆盖规则集
    config["rule-providers"] = {
        "Crypto": {
            ...ruleProviderCommon,
            "url": "https://github.com/blackmatrix7/ios_rule_script/raw/master/rule/Clash/Crypto/Crypto.list",
            "path": "./rule/Crypto.list"
        },
        "Telegram": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
            "path": "./rules/Telegram.list"
        },
        "ChinaIP": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaIP.list",
            "path": "./rules/ChinaIP.list"
        },
        "LAN": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
            "path": "./rules/Lan.list"
        },
        "AI": {
            ...ruleProviderCommon,
            "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
            "path": "./rules/AI.list"
        }
    };

    // 覆盖规则
    config["rules"] = [
        "DOMAIN-SUFFIX,mcdn.bilivideo.com,REJECT",
        "DOMAIN-SUFFIX,mcdn.bilivideo.cn,REJECT",
        "DOMAIN-SUFFIX,szbdyd.com,REJECT",
        "RULE-SET,LAN,DIRECT",
        "RULE-SET,Telegram,Telegram",
        "RULE-SET,Crypto,Crypto",
        "RULE-SET,AI,AI",
        "RULE-SET,ChinaIP,DIRECT",
        "GEOSITE,gfw,Proxies",
        "GEOIP,lan,DIRECT",
        "GEOIP,CN,DIRECT",
        "SRC-GEOIP,cn,DIRECT",
        "MATCH,Proxies"
    ];

    // 返回修改后的配置
    return config;
}