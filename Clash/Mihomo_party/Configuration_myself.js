function main(config) {
    config["proxy-groups"] = [
        {
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Auto_Speed.png",
            name: "Proxies",
            type: "select",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "^(?=.*((?i)🇭🇰|香港|(\b(HK|Hong)\b)|🇹🇼|🇨🇳|台湾|(\b(TW|Tai|Taiwan)\b)|🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)|🇯🇵|日本|川日|东京|大阪|泉日|埼玉|(\b(JP|Japan)\b)))(?!.*((?i)回国|校园|游戏|🎮|(\b(GAME)\b))).*$",
        },
        {
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Telegram.png",
            name: "Telegram",
            type: "select",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            // filter: "(?i)🇭🇰|香港|(\b(HK|Hong)\b)|🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)"
        },
        {
            icon: "https://raw.githubusercontent.com/tugepaopao/Image-Storage/master/cartoon/Cute/%23.png",
            name: "AI",
            type: "select",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        },
        {
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Final.png",
            name: "GLOBAL",
            type: "select",
            "include-all": true,
        }
    ];
    if (!config['rule-providers']) {
        config['rule-providers'] = {};
    }
    config["rule-providers"] = Object.assign(config["rule-providers"], {
        cn_asn: {
            url: "https://whatshub.top/rule/ASN-CN.list",
            path: "./ruleset/cn_asn.list",
            behavior: "classical",
            interval: 86400,
            format: "text",
            type: "http",
        },
        telegram: {
            url: "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
            path: "./ruleset/telegram.list",
            behavior: "classical",
            interval: 86400,
            format: "text",
            type: "http",
        },
        ai: {
            url: "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
            path: "./ruleset/ai.yaml",
            behavior: "classical",
            interval: 86400,
            format: "text",
            type: "http",
        },
        Spotify: {
            url: "https://github.com/blackmatrix7/ios_rule_script/raw/master/rule/Clash/Spotify/Spotify.list",
            path: "./ruleset/spotify.list",
            behavior: "classical",
            interval: 86400,
            format: "text",
            type: "http",
        },
        Proxy: {
            url: "https://whatshub.top/rule/Proxy.list",
            path: "./ruleset/Proxy.list",
            behavior: "classical",
            interval: 86400,
            format: "text",
            type: "http",
        },
        WeChat: {
            url: "https://whatshub.top/rule/WeChat.list",
            path: "./ruleset/WeChat.list",
            behavior: "classical",
            interval: 86400,
            format: "text",
            type: "http",
        },
        PTDomain: {
            url: "https://raw.githubusercontent.com/linyin022/Public-Config/main/Clash/Rule/PTDomain.list",
            path: "./ruleset/PTDomain.list",
            behavior: "classical",
            interval: 86400,
            format: "text",
            type: "http",
        }
    });

    config["rules"] = [
        "RULE-SET,PTDomain,DIRECT",
        "RULE-SET,WeChat,DIRECT",
        "RULE-SET,ai,AI",
        "RULE-SET,telegram,Telegram",
        "RULE-SET,Spotify,DIRECT",
        "RULE-SET,Proxy,Proxies",
        "RULE-SET,cn_asn,DIRECT",
        "GEOSITE,github,Proxies",
        "GEOIP,lan,DIRECT",
        "GEOIP,CN,DIRECT",
        "MATCH,Proxies",
    ];

    return config;
}
