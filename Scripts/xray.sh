#!/bin/bash

set -e

APIKEY="$1"
APIHOST="$2"
NODEID="$3"

if [[ -z "$APIKEY" || -z "$APIHOST" || -z "$NODEID" ]]; then
  echo "用法: bash install_xrayr.sh <ApiKey> <ApiHost> <NodeID>"
  exit 1
fi

if [[ $EUID -ne 0 ]]; then
  echo "请用 root 用户运行"
  exit 1
fi

# 安装 XrayR
bash <(curl -Ls https://raw.githubusercontent.com/XrayR-project/XrayR-release/master/install.sh)

# 生成 config.yml
cat > /etc/XrayR/config.yml <<EOF
Log:
  Level: warning
Nodes:
  - PanelType: "NewV2board"
    ApiConfig:
      ApiHost: "$APIHOST"
      ApiKey: "$APIKEY"
      NodeID: $NODEID
      NodeType: Shadowsocks
    ControllerConfig:
      ListenIP: 0.0.0.0
      UpdatePeriodic: 60
      EnableDNS: false
      DNSType: AsIs
      DisableUploadTraffic: false
      DisableGetRule: false
      EnableProxyProtocol: false
      TCPProxyProtocolPort: 0
      EnableFallback: false
      FallBackConfigs: []
      CertConfig:
        CertMode: none
        CertDomain: ""
        CertFile: ""
        KeyFile: ""
EOF

systemctl restart XrayR

echo "✅ XrayR 安装完成，并成功对接 V2Board Shadowsocks 节点！"
