module.exports = [
  {
    id: 'flight_001',
    direction: 'CN_TO_ID',
    departure_date: '2026-04-12',
    departure_city: '广州',
    departure_airport: 'CAN 白云机场',
    arrival_city: '龙目岛',
    arrival_airport: 'LOP Lombok Airport',
    available_weight_kg: 18,
    volume_note: '可接中小件，纸箱尺寸建议不超过 55cm',
    reference_price: '按公斤协商，参考 65 元/kg',
    remark: '只接正规电商平台直发到我这里的货，登机前 2 天确认。',
    wechat_id: 'lombok-flight-amy',
    status: 'OPEN'
  },
  {
    id: 'flight_002',
    direction: 'ID_TO_CN',
    departure_date: '2026-04-18',
    departure_city: '龙目岛',
    departure_airport: 'LOP Lombok Airport',
    arrival_city: '上海',
    arrival_airport: 'PVG 浦东机场',
    available_weight_kg: 12,
    volume_note: '适合保健品、化妆品等小体积电商商品',
    reference_price: '参考 80 元/kg',
    remark: '到国内后可走顺丰同城，不接私人自带物品。',
    wechat_id: 'id2cn-lin',
    status: 'MATCHING'
  },
  {
    id: 'flight_003',
    direction: 'CN_TO_ID',
    departure_date: '2026-04-26',
    departure_city: '深圳',
    departure_airport: 'SZX 宝安机场',
    arrival_city: '巴厘岛中转龙目岛',
    arrival_airport: 'DPS / LOP',
    available_weight_kg: 22,
    volume_note: '适合电商包裹拼单，优先接淘宝/拼多多/京东',
    reference_price: '参考整单协商',
    remark: '可以提前拉微信群确认清单，禁止夹带私人用品。',
    wechat_id: 'sz-lombok-mike',
    status: 'OPEN'
  }
];
