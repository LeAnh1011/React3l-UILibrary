interface DATA {
    id: number;
    key: string | number;
    code?: string;
    name?: string;
    description?: string;
    lightIcon?: string;
    lightLogo?: string;
    darkIcon?: string;
    darkLogo?: string;
    colorCode?: string;
    isDisplay?: boolean;
    themeId?: string;
    siteTypeId?: number;
    siteType?: any;
}
export const dataSource: DATA[] = [
    {
        id: 100,
        key: 1,
        code: "/landing-page",
        name: "Cổng thông tin doanh nghiệp",
        description: "mô tả hihi",
        lightIcon:
            "/rpc/utils/public-file/download/site/20220715/6e511d35-411a-4580-b189-02f9106e82ff.png",
        lightLogo:
            "/rpc/utils/public-file/download/site/20220715/572c85b8-4dd5-4832-9bfc-8cb9e7a5b072.png",
        darkIcon:
            "/rpc/utils/public-file/download/site/20220715/507d2788-76f8-4470-aceb-5a961778e3c3.png",
        darkLogo:
            "/rpc/utils/public-file/download/site/20220715/a8dfc993-18e0-48e6-a600-e3ce03d61448.png",
        colorCode: undefined,
        isDisplay: true,
        themeId: undefined,
        siteTypeId: 3,
        siteType: {
            id: 3,
            code: "Setting",
            name: "Cài đặt",
        },
    },
    {
        id: 18,
        key: 2,
        code: "/construction/",
        name: "CONSTRUCTION",
        description: undefined,
        lightIcon: undefined,
        lightLogo: undefined,
        darkIcon: undefined,
        darkLogo: undefined,
        colorCode: undefined,
        isDisplay: false,
        themeId: undefined,
        siteTypeId: 3,
        siteType: {
            id: 3,
            code: "Setting",
            name: "Cài đặt",
        },
    },
    {
        id: 17,
        key: 3,
        code: "/portal/",
        name: "PORTAL",
        description: undefined,
        lightIcon:
            "/rpc/utils/public-file/download/site/20220715/8635f2ab-d8ae-48b2-a1d1-44b04a78740b.png",
        lightLogo:
            "/rpc/utils/public-file/download/site/20220715/4bddf998-8975-4d6b-924d-a462c98a1659.png",
        darkIcon:
            "/rpc/utils/public-file/download/site/20220715/d7998a00-2d53-49b7-a21d-f8a01100e90a.png",
        darkLogo:
            "/rpc/utils/public-file/download/site/20220715/d09d1aa4-a796-4703-83aa-c0adaf34439e.png",
        colorCode: "#fccb00",
        isDisplay: false,
        themeId: undefined,
        siteTypeId: 3,
        siteType: {
            id: 3,
            code: "Setting",
            name: "Cài đặt",
        },
    },
    {
        id: 16,
        key: 4,
        code: "/investment/",
        name: "Investment",
        description: undefined,
        lightIcon: undefined,
        lightLogo: undefined,
        darkIcon: undefined,
        darkLogo: undefined,
        colorCode: undefined,
        isDisplay: false,
        themeId: undefined,
        siteTypeId: 3,
        siteType: {
            id: 3,
            code: "Setting",
            name: "Cài đặt",
        },
    },
    {
        id: 15,
        key: 5,
        code: "/pmdm/",
        name: "PMDM",
        description: undefined,
        lightIcon: undefined,
        lightLogo: undefined,
        darkIcon: undefined,
        darkLogo: undefined,
        colorCode: undefined,
        isDisplay: false,
        themeId: undefined,
        siteTypeId: 1,
        siteType: {
            id: 1,
            code: "Sale",
            name: "Bán hàng",
        },
    },
    {
        id: 14,
        key: 6,
        code: "/report-rd/",
        name: "DWE",
        description: undefined,
        lightIcon:
            "/rpc/utils/public-file/download/site/20220728/3003bbd6-9435-4ec3-b1f4-13df458efd57.png",
        lightLogo: undefined,
        darkIcon: undefined,
        darkLogo: undefined,
        colorCode: undefined,
        isDisplay: false,
        themeId: undefined,
        siteTypeId: 1,
        siteType: {
            id: 1,
            code: "Sale",
            name: "Bán hàng",
        },
    },
    {
        id: 13,
        key: 7,
        code: "/pms/",
        name: "PMS",
        description: "Phân quyền tập trung",
        lightIcon: undefined,
        lightLogo: undefined,
        darkIcon:
            "/rpc/utils/public-file/download/site/20220623/3d3eb7cb-4ff0-4a96-b8db-1ebdcbbca7cb.jpg",
        darkLogo:
            "/rpc/utils/public-file/download/site/20220623/3c7b3fee-a305-43da-9d31-48c11c97d2dc.png",
        colorCode: undefined,
        isDisplay: false,
        themeId: undefined,
        siteTypeId: 1,
        siteType: {
            id: 1,
            code: "Sale",
            name: "Bán hàng",
        },
    },
    {
        id: 12,
        key: 8,
        code: "/my-company/",
        name: "Office Loop",
        description: "Văn phòng điện tử",
        lightIcon:
            "/rpc/utils/public-file/download/site/20220729/9951fbd8-86c0-410b-a254-ffb1cd5e1386.png",
        lightLogo:
            "/rpc/utils/public-file/download/site/20220715/d9620364-12fb-4ef0-8436-266a14c9221b.png",
        darkIcon:
            "/rpc/utils/public-file/download/site/20220715/0c129b00-bfe3-4b1d-8be7-aae57294872c.png",
        darkLogo:
            "/rpc/utils/public-file/download/site/20220715/01ea566d-68db-4338-bea7-dfaea6888213.png",
        colorCode: undefined,
        isDisplay: true,
        themeId: undefined,
        siteTypeId: 2,
        siteType: {
            id: 2,
            code: "Operate",
            name: "Vận hành",
        },
    },
    {
        id: 11,
        key: 9,
        code: "/order-hub/",
        name: "Internal Stream",
        description: "Đơn hàng nội bộ",
        lightIcon:
            "/rpc/utils/public-file/download/site/20220728/e2ec6c67-c01f-4a01-98ba-b3098c0dec99.png",
        lightLogo:
            "/rpc/utils/public-file/download/site/20220715/9296ad7a-417a-480a-8314-c2eb83df2127.png",
        darkIcon:
            "/rpc/utils/public-file/download/site/20220715/6612e5c5-18c6-451e-aff4-2cb2162c7199.png",
        darkLogo:
            "/rpc/utils/public-file/download/site/20220715/70ddca6f-a81f-4b8a-afff-8aef6e43ebbd.png",
        colorCode: undefined,
        isDisplay: true,
        themeId: undefined,
        siteTypeId: 2,
        siteType: {
            id: 2,
            code: "Operate",
            name: "Vận hành",
        },
    },
    {
        id: 10,
        key: 10,
        code: "/eos/",
        name: "EOS",
        description: undefined,
        lightIcon:
            "/rpc/utils/public-file/download/site/20220715/63348cbf-72ce-4241-905c-0f3a8af7a9d5.png",
        lightLogo:
            "/rpc/utils/public-file/download/site/20220715/32cc2383-940a-4aef-893b-7e99ef4e771d.png",
        darkIcon:
            "/rpc/utils/public-file/download/site/20220715/b743945b-feff-44c3-affa-6251cc9832b0.png",
        darkLogo:
            "/rpc/utils/public-file/download/site/20220715/45f98f0a-0224-490e-91b0-f65e6d650dd4.png",
        colorCode: undefined,
        isDisplay: false,
        themeId: undefined,
        siteTypeId: 1,
        siteType: {
            id: 1,
            code: "Sale",
            name: "Bán hàng",
        },
    },
];
