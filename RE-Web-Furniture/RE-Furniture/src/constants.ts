/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  finish: string;
  leadTime: string;
  images: {
    primary: string;
    gallery: string[];
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "heritage-lounge",
    name: "The Heritage Lounge",
    sku: "ART-CH-0042",
    price: 145000,
    category: "Seating",
    stock: 18,
    material: "American Walnut",
    finish: "Cognac Aniline",
    dimensions: "85W × 92D × 80H cm",
    leadTime: "8–12 Weeks",
    description: "A masterful synthesis of mid-century restraint and modern material excellence. Features hand-finished walnut contours that cradle premium top-grain leather.",
    features: ["Handcrafted", "Limited Edition"],
    images: {
      primary: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4v6oAXuawdvLta9_ZdpDsKS8jR79Vu8hC3ORstncpVgZnffXwLmYan8ezkkSTEYZWVNFdnbiOl5PCV6C8eDwpxPKySvLW1QNkkPzziYuFf7Ct25bARmlXvpwSAgJJKE38eL5CSX9fU_CSJHC28HyK3hM7DZcoKn8xALHlviNF_GxD9rSv960BRQhvcWOJU47q3_y_Qb7Tt7MRVrrlui-dmr0IlloFSHsxiD54QguX4EOaO4yG1BEmxdbNEyN0Gbno3Jbj54gvTv8",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC0v_5um2pKR7RXpiMf1HCBcPvPmgotfWgpXQAHpqS0x08NLIKvHUU134N3OKeaig0oTY0Q95K15nlMSyLnEXUngFSsl4kvv2VlZyOfM8_ao2TqTU6-UD51oHbwc96lENm0D1U2j4cCLDCOIj76EehsZuJnhyIF1oXm2H_FcVySlMk58XHEvvEBz4cvJQyYkjVDOkV-dTFGINV09Ezl6FDAElAIigbvbhiDclyMhKcLbEbOUrEonKdtkGlJkf5vB-u1IMSWpCA2A9U",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQMvodwvbjYlD-QTRio1UJKUpkH0CGgwpbznDyZ-3gMtOSuKrq0gVCwARSVZYPzBwJLyjPyNgA25bogZYWGKlmn_5VXMQiSu50fBAWwbMrxW1O7Jsm1psKcTDVXeYjNCss5L8O4gMBz36IWa5BxpSSFhy83_y4ZF4uAR4yjiaskSml9xR8vQSm5PLAevYT_OKPTbox8YCGluj5RmDvxO8fG0ROgbNrkTfXFQHXn2N2dMNyRqcRsk7NzmNvvsZfMvq9YW-KdgIfJ-Q"
      ]
    }
  },
  {
    id: "monolith-sofa",
    name: "The Monolith Sofa",
    sku: "ART-SF-0012",
    price: 142500,
    category: "Seating",
    stock: 5,
    material: "White Oak",
    finish: "Italian Linen",
    dimensions: "240W × 95D × 70H cm",
    leadTime: "12–14 Weeks",
    description: "Deep-seated comfort meeting architectural precision. Upholstered in premium Italian linen with a solid white oak base.",
    features: ["Featured Arrival"],
    images: {
      primary: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeaxzYNv3_hvnw_FF5A7WQh-IRjA0fa82WMDjGThJzgI3JQLtCuCawySKEkJvmUAWVjAKdm2ZaUMFknJisZAkiN5wI7KHeS7HC6W3UBOFkBu9xi4YAkR8HOVfka6LzQNkHguk1u5PIzGSkMIbajfZwYpczJTJyc4YcbXyZMcoTysQWg1ZRoTz_Br16bO-xxiMjmppjUASmdHgjlfsFzj3fvxL30hb0SfYf3nkpx9rYoU4wPC24Yz5aOXn8ewcP_8V5U3Vwk0SMs6I",
      gallery: []
    }
  },
  {
    id: "scandi-lounge",
    name: "Scandi Lounge Chair",
    sku: "ART-CH-0551",
    price: 24900,
    category: "Seating",
    stock: 12,
    material: "Steam-bent Oak",
    finish: "Organic Rattan",
    dimensions: "75W × 80D × 72H cm",
    leadTime: "4–6 Weeks",
    description: "Steam-bent oak frame with organic rattan detailing.",
    features: ["Sustainable"],
    images: {
      primary: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe7iS99Hi-ksEuimlF6sJGLr--CFvToWOBu4nTr-vHGMQ4-LUxaY2Lkc3ouQ1zGEdb10-LsFfCwlDM4ocMCnAcfWfoKRBvaJQfntxnrCKwn2LZcgujiexaq4rjLRAgTlFcDP4dH25vHqiTiW1udMxDnPvTC2T_9VplRhErpwz1lzW5vTLUKcmy2KMKB6NEHyKgN0uE5RhUb1C_qZNGjotWlNlZ-KkwEolTrP2NVJ4eoAM7he24P5tIAyBKLbNmBEFFn3firrODUjo",
      gallery: []
    }
  },
  {
    id: "alpine-table",
    name: "Alpine Dining Table",
    sku: "ART-TB-0922",
    price: 68000,
    category: "Tables",
    stock: 3,
    material: "Solid Oak",
    finish: "Natural Oil",
    dimensions: "220W × 100D × 75H cm",
    leadTime: "10–12 Weeks",
    description: "Solid core table designed for generational longevity.",
    features: ["Handcrafted"],
    images: {
      primary: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdz72PH4ooUkQZZHXFj-CKVZ_aj22zeujF3IzQg-rQIP_ncq8X1Lp9kwTsDlJBnMBoJAbRTqAwgA8ck46shXsbrKBJL8_VMbeYV63Ru_M2TZE4COyg3XQvaZvKmsvEfoklIr79jNQNRhak_YyP7rjOtgkC8Jxb3yKKEUKN6Z90BZRMB1K0wGr38osmxlJV0eFdElR9Pp-22QnHMRWxC_l3Yd2FRswUDxBMur1mM5cmXBxe21Smjwrlf32w8m5Kjxduv5Rz_IyOp2M",
      gallery: []
    }
  },
  {
    id: "tapered-console",
    name: "Tapered Oak Console",
    sku: "ART-CN-0981",
    price: 62500,
    category: "Furniture",
    stock: 4,
    material: "Oak",
    finish: "Natural Wood",
    dimensions: "120W × 40D × 75H cm",
    leadTime: "6–8 Weeks",
    description: "A Tapered Oak Console with a clean, linear design showcased in a sunlit hallway.",
    features: ["Bespoke"],
    images: {
      primary: "https://lh3.googleusercontent.com/aida-public/AB6AXuByt1M4x_GrRvifRcFyqO2JYqbaNXMQyJ-HFvYoJTG5J2354Cci8QiCQ1s8xjogI_aV27YLdWsHfBKRSgYCp1KQJjtVrHAtUspI10FxJWa1MOil8b2LtIvKVNG_y4_gLsdB5DjAPL2Vt1eADrybwKQ5XNCWTfjAnzz6fNmjvEnYrDhpriSPWE4h9vPxwCQq-2bdwvDyt_SYWGLMcpKb9GbffuQmYFVGbv5pOzVhHwLzO25VHOA9WjNkRAZQZnYGws2xef-RoMWRgNg",
      gallery: []
    }
  }
];
