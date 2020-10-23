import {getToken} from "@/utils/token"
export default{
    clientId: 'mkxweb', // 客户端id
    clientSecret: 'mkx_secret1', // 客户端密钥
    uploadUrl:'/api/alioss/imgupload',
    header:{
        'Blade-Auth':'bearer '+ getToken()
     },
     fronturl:'/api/alioss/idcard-upload', //身份证正面
     businessLicense:'/api/alioss/buslicense-upload', //营业执照
     terminal: [{
        id: 1,
        title: "壹农源云视频终端器",
        func: '功能介绍：200 万红外阵列筒型网络摄像机，用于养殖场现场直播，可在壹农源APP、管理平台上查看。',
        model: '型号：YNY-SPZD-200W-A',
        img: require('../assets/new/terminator.png'),
        desc: [{
                li: '背光补偿, 3D 数字降噪'
            },
            {
                li: '红外灯补光, 最远可达50 m'
            },
            {
                li: '内置1 个麦克风'
            },
            {
                li: '电源供应	DC12 V ± 25%, Φ5.5 mm 圆口'
            },
            {
                li: '最远红外距离	50 m'
            },
            {
                li: '功耗	DC12 V: 5 W Max'
            },
            {
                li: 'PoE: 6 W Max'
            },
            {
                li: '工作温度和湿度	-30℃ ~ 60℃, 湿度小于95%(无凝结)'
            }
        ]
    },
    {
        id: 2,
        title: "壹农源超高频蓝牙发卡器",
        func: '功能介绍：与壹农源APP配对后，可识别附近的RFID标签，为每一只禽畜打上唯一识别的身份编码',
        model: '型号：YNY-LYFKQ-915M-A',
        img: require('../assets/new/bluetooth.png'),
        desc: [{
                li: '外形小巧方正，适合于手持使用'
            },
            {
                li: '使用70mm x 70mm陶瓷天线，读写标签无盲区'
            },
            {
                li: '读标签距离范围宽广，从10cm 到3m可调，以适应不同应用场合'
            },
            {
                li: '业内较高的写标签成功率'
            },
            {
                li: '多标签识别能力：>50张标签'
            },
            {
                li: '标签识别速度：>50张/秒'
            }
        ]
    },
    {
        id: 4,
        img: require('../assets/new/Integrated.png'),
        title: "壹农源RFID无线一体机",
        func: '功能介绍：915MHZ超高频射频读写器，用R2000智能读写芯片，搭载12DB天线，支持超远距离2.4g无线传输，传输距离最远可达3KM。用于识别禽畜身上的唯一身份标签，进行智能盘点',
        model: '型号：YNY-RFIDYTJ-12DB-A',
        desc: [{
                li: '完全自主知识产权设计'
            },
            {
                li: '充分支持符合ISO18000-6C（EPC G2）或ISO-18000-6B 标准的电子标签'
            },
            {
                li: '内置Impinj R2000模块'
            },
            {
                li: '输出功率达至 30dBm（可调）；'
            },
            {
                li: '12dbi 天线配置，稳定读取距离 6米'
            },
            {
                li: '低功耗设计，单＋12V 电源供电'
            },
            {
                li: '支持 RS232、RS485、韦根接口，超远距离2.4G模块传输'
            }
        ]
    },
    {
        id: '6',
        img: require('../assets/new/transmission.png'),
        title: "壹农源智联传输服务器",
        func: '功能介绍：接收摄像头捕捉到的画面并上传至壹农源工业数字服务器。通过服务器处理并上传云端之后，壹农源的用户就可以看到养殖场的现场直播',
        model: '型号：YNY-ZLCS-5L-A',
        desc: [{
                li: '输入电压：DC10~58V（双冗余）'
            },
            {
                li: '工作温度：-30℃～+70℃'
            },
            {
                li: '外壳：IP40防护，无风扇设计'
            },
            {
                li: '检测报告：CCC、RoHS、FC、CE、ISO'
            },
            {
                li: '防静电：8KV-15KV'
            },
            {
                li: 'MTBF:100000小时'
            }
        ]
    },
    {
        id: 7,
        title: "壹农源环境监测终端",
        children:[
             {
                 id:1,
                 img: require('../assets/new/water.png'),
                 title:'壹农源液体PH传感器',
                 func: '功能介绍：对禽畜养殖棚内水质中的PH值做检测作用可以观测水质的受污染程度。用户可在壹农源APP和管理平台上查看相关数据。检测间隔一小时一次，可随时掌握水质壤酸碱度变化，及时采取应对措施',
                 model: '型号：YNY-CGQ-YTPH-A',
                desc: [{
                         li: '测量范围	PH（0-14）/ORP±1000mV'
                    },
                    {
                         li: '测量精度	PH0.02PH；ORP±1mV'
                     },
                    {
                         li: '稳定性	PH≤0.04/24小时；ORP≤3mV/24小时'
                   },
                   {
                          li: '温测范围	0-100℃'
                  },
                  {
                          li: '温度补偿	0～100手动/自动'
                  },
                  {
                          li: '通讯功能	RS485功能，标准Modbus协议'
                 },
                {
                          li: '电极型号	E-201-C-9PH复合电极'
                 },
                 {
                          li: '电源	DC6V-24V'
                }
               ]
             },
             {
               id:2,
        title: "壹农源土壤PH传感器",
        img: require('../assets/new/sensor.png'),
        func: '功能介绍：用于养殖场附近的土壤酸碱度检测，用户可在壹农源APP和管理平台上查看相关数据。检测间隔一小时一次，可随时掌握土壤酸碱度变化，及时采取应对措施',
        model: '型号：YNY-CGQ-YTPH-A',
        desc: [{
                li: '直流供电（默认）	12-24V DC'
            },
            {
                li: '耗电	≤0.15W'
            },
            {
                li: '测量精度	±0.3pH'
            },
            {
                li: 'PH测量范围	3-9pH'
            },
            {
                li: '长期稳定性	≤5%/year'
            },
            {
                li: '输出信号	RS485输出(Mondbus协议)'
            },
            {
                li: '工作温度	0-55℃',
            },
            {
                li: '响应速度	≤15s'
            }
        ]  
             },
             {
                 id:3,
         img: require('../assets/new/co2.png'),
        title: "二氧化碳温湿度一体传感器",
        func: '功能介绍：对禽畜养殖棚内空气中的温湿度，二氧化碳浓度做检测，观测空气质量状况。用户可在壹农源APP和管理平台上查看相关数据。检测间隔一小时一次，可随时掌握空气中的温湿度，二氧化碳浓度变化，及时采取应对措施',
        model: '型号：YNY-CGQ-CO2WS-A',
        desc: [{
                li: '测量范围	-50℃－100℃'
            },
            {
                li: '测量精度	±0.5℃'
            },
            {
                li: '分辨率	0.1℃'
            },
            {
                li: '气压量程范围	500-1100hpa'
            },
            {
                li: '输出方式	RS485信号，支持Modbus协议'
            },
            {
                li: '储存温度	-50℃-80℃'
            },
            {
                li: '电源	DC6V-24V'
            }
        ]
             }

        ],
    },
    {
        id: 8,
        img: require('../assets/new/radio.png'),
        title: "壹农源无线传输电台",
        func: '功能介绍：2.4g超远距离无线接收设备，最远传输距离可达7KM，打破了传统无线传输（WiFi、蓝牙等）距离短、稳定性差的弊端。用于接收壹农源RFID无线一体机采集的标签信息，完成智能化禽畜管理',
        model: '型号：YNY-WXDT-24G-A',
        desc: [{
                li: '采用军工级调制技术，具有数据加密'
            },
            {
                li: '简单的高效电源设计，支持电源设配器或压线方式，支持 8～28V 供电'
            },
            {
                li: '发射功率最高可达 27dBm，并支持多级可调，所有技术指标达到欧洲工业标准'
            },
            {
                li: '支持 LBT 功能，电台自动根据当前环境噪音强度等待发送。极大的提高模块在恶劣环境下的通信成功率'
            },
            {
                li: '支持通信密钥功能，有效防止数据被截取'
            },
            {
                li: '采用温度补偿电路，频率稳定度优于±1.5PPM'
            },
            {
                li: '工作温度范围: -40℃～+85℃，适应各种严酷的工作环境，真正的工业级产品'
            },
            {
                li: '全铝合金外壳， 体积紧凑，安装方便，散热性好；完美的屏蔽设计，电磁兼容性好，抗干扰能力强'
            },
            {
                li: '电源逆接保护、过接保护、天线浪涌保护等多重保护功能，大大增加了电台可靠性'
            },
            {
                li: '强大的软件功能，所有参数可通过编程设置: 如功率、频率、空中速率、等'
            },
            {
                li: '内置看门狗，并进行精确时间布局，一旦发生异常，模块将自动重启，且能继续按照先前的参数设置继续工作'
            }
        ]
    },
    {
        id: 9,
        img: require('../assets/new/server.png'),
        title: "壹农源工业数字服务器",
        func: '功能介绍：对现场采集到的信息进行集中处理，并上传至云端服务器，实现环境监测、智能化禽畜管理、视频直播等功能。壹农源APP和管理平台的数据都是由它提供的',
        model: '型号：YNY-GKJ-8G-OPS-A',
        desc: [{
                li: 'Intel Atom J1900处理器'
            },
            {
                li: 'DDR3L SODIMM x1，最大支持8GB 内存'
            },
            {
                li: '6个RS-232串口(其中4个支持RS485/RS442)'
            },
            {
                li: '2个Intel i210/i211 千兆网卡'
            },
            {
                li: '一键还原，看门狗，无盘启动 '
            },
            {
                li: '低功耗无风扇'
            },
            {
                li: '工作温度：-20℃ to +60℃'
            }
        ]
    }
],
     
}