export type SideData = {
    id: number
    avatar: string
    name: string
}
export type SideDataType = {
    sideData: SideData[]
}
let initialState: SideDataType = {
    sideData: [
        {
            id: 1,
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU',
            name: 'Sasha'
        },
        {id: 2, avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', name: 'Sofia'},
        {
            id: 3,
            avatar: 'https://images.ctfassets.net/hrltx12pl8hq/61DiwECVps74bWazF88Cy9/2cc9411d050b8ca50530cf97b3e51c96/Image_Cover.jpg?fit=fill&w=480&h=270',
            name: 'Vlad'
        }
    ]
}
const sidebarReducer = (state: SideDataType = initialState, action: any): SideDataType => {
    return state
}
export default sidebarReducer