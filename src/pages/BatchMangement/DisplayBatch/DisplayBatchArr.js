
const displayBatchArr = [
    {
        'type': 'text',
        'id': 'batch_name',
        'name': 'batch_name',
        'required': true,
        'display': true,
        'label': 'Batch Name',
        'link':
        {
            'link': '/display-student',
            'dynamic': true
        },
        'placeholder': 'Batch Name',
        // 'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'time',
        'display': true,
        'id': 'batch_timing',
        'name': 'batch_timing',
        // 'required': true,
        'label': 'Batch Timing',
        'placeholder': 'Batch Timing',
        // 'icon': <SupervisorAccountIcon className={iconCss} />
    },
    {
        'type': 'time',
        'display': false,
        'id': 'batch_start_timing',
        'name': 'batch_start_timing',
        'required': true,
        'placeholder': 'Batch Start Timing',
        // 'icon': <SupervisorAccountIcon className={iconCss} />
    },
    {
        'type': 'time',
        'display': false,
        'id': 'batch_end_timing',
        'name': 'batch_end_timing',
        'required': true,
        'placeholder': 'Batch End Timing',
        // 'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'array',
        'id': 'batch_days',
        'display': true,
        'name': 'batch_days',
        'required': true,
        'option': [
            { 'label': 'Sunday', 'value': 'Sunday' },
            { 'label': 'Monday', 'value': 'Monday' },
            { 'label': 'Tuesday', 'value': 'Tuesday' },
            { 'label': 'Wednesday', 'value': 'Wednesday' },
            { 'label': 'Thursday', 'value': 'Thursday' },
            { 'label': 'Friday', 'value': 'Friday' },
            { 'label': 'Saturday', 'value': 'Saturday' }
        ],
        'label': 'Batch Days',
        'placeholder': 'Batch Days',
        // 'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'dynamicoption',
        'id': 'teacher',
        'name': 'teacher',
        'display': true,
        // 'required': true,
        'label': 'Teacher',
        'placeholder': 'Teacher',
        // 'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'dynamicoption',
        'id': 'brand_name',
        'name': 'brand_name',
        'display': true,
        // 'required': true,
        'label': 'Brand',
        'placeholder': 'Brand',
        // 'icon': <Factory className={iconCss} />
    },
    // {
    //     'type': 'dynamicoption',
    //     'id': 'brand_name',
    //     'name': 'brand_name',
    //     // 'display': true,
    //     // 'required': true,
    //     'label': 'Brand',
    //     'placeholder': 'Brand',
        // 'icon': <Factory className={iconCss} />
    // },
    {
        label: "Action",
        placeholder: "Action",
        // value: "Default",
        required: false,
        display: true,
    }
]

export default displayBatchArr;