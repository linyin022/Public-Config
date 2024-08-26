function main(config) {
    config["proxy-groups"] = [
        {
            icon: "https://raw.githubusercontent.com/Orz-3/face/master/Global.png",
            name: "Proxies",
            type: "select",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "^(?=.*((?i)🇭🇰|香港|(\b(HK|Hong)\b)|🇹🇼|🇨🇳|台湾|(\b(TW|Tai|Taiwan)\b)|🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)|🇯🇵|日本|川日|东京|大阪|泉日|埼玉|(\b(JP|Japan)\b)))(?!.*((?i)回国|校园|游戏|🎮|(\b(GAME)\b))).*$",
            proxies: ["Universal"]
        },
        {
            icon: "https://raw.githubusercontent.com/Orz-3/face/master/Message.png",
            name: "Telegram",
            type: "select",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "(?i)🇭🇰|香港|(\b(HK|Hong)\b)|🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)"
        },
        {
            icon: "https://raw.githubusercontent.com/Orz-3/face/master/Static.png",
            name: "AIGC",
            type: "select",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)"
        },
        {
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Available.png",
            name: "Universal",
            type: "select",
            "include-all": true,
            filter: "^(?=.*(.))(?!.*((?i)回国|校园|游戏|🎮|(\b(GAME)\b)|🇭🇰|香港|(\b(HK|Hong)\b)|🇹🇼|🇨🇳|台湾|(\b(TW|Tai|Taiwan)\b)|🇯🇵|日本|(\b(JP|Japan)\b)|🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)|🇺🇸|美国|(\b(US|United States)\b))).*$"
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
        }
    });

    config["rules"] = [
        "RULE-SET,ai,AIGC",
        "RULE-SET,telegram,Telegram",
        "RULE-SET,Spotify,DIRECT",
        "RULE-SET,cn_asn,DIRECT",
        "GEOSITE,github,Proxies",
        "GEOSITE,cn,DIRECT",
        "GEOIP,lan,DIRECT",
        "GEOIP,CN,DIRECT",
        "MATCH,Proxies",
    ];

    return config;
}
