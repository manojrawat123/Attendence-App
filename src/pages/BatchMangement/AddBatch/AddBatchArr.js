

const addBatchArr = [
    {
        'type': 'text',
        'id': 'batch_name',
        'name': 'batch_name',
        'required': true,
        'placeholder': 'Batch Name',
    },
    {
        'type': 'time',
        'id': 'batch_start_timing',
        'name': 'batch_start_timing',
        'required': true,
        'placeholder': 'Batch Start Timing',
    },
    {
        'type': 'time',
        'id': 'batch_end_timing',
        'name': 'batch_end_timing',
        'required': true,
        'placeholder': 'Batch End Timing',
    },
    {
        'type': 'array',
        'id': 'batch_days',
        'name': 'batch_days',
        'required': true,
        'option' :[
            {'name': 'Sunday', 'id': 'Sunday'},
            {'name': 'Monday', 'id': 'Monday'},
            {'name': 'Tuesday', 'id': 'Tuesday'},
            {'name': 'Wednesday', 'id': 'Wednesday'},
            {'name': 'Thursday', 'id': 'Thursday'},
            {'name': 'Friday', 'id': 'Friday'},
            {'name': 'Saturday', 'id': 'Saturday'}
        ],
        'placeholder': 'Batch Days',
    },
    {
        'type': 'dynamicoption',
        'id': 'assigned_to',
        'name': 'assigned_to',
        'required': true,
        'placeholder': 'Teacher',
    },
    {
        'type': 'dynamicoption',
        'id': 'brand',
        'name': 'brand',
        'required': true,
        'placeholder': 'Select Brand',
    },
]

export default addBatchArr;