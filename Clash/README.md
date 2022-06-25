# Clash

[Linyin_Beta](https://github.com/linyin022/Clash/blob/main/Linyin_Beta) [旧版本]

新增[Linyin_04_23](https://github.com/linyin022/Clash/blob/main/Linyin_04_23)（完全重改了策略组。）[现主用]

[Neverlosecontact](https://github.com/linyin022/Clash/blob/main/Neverlosecontact)即永不失联策略组[测试中]，具体思路为：

- hk、sg、jp三个地区负均衡
- hk、jp两个单独查询选择
- **Neverlosecontact**使用故障转移套hk、sg两个负载均衡
- Netflix只套了一个sg的负载均衡
  - 在clash设置中将**隐藏无法选择的策略组**选项打开
