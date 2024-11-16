const DetailsRow: React.FC<{ icon: string, title: string, data: string }> = ({ icon, title, data }) => {


    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start border border-red-500">
                <div className='flex flex-shrink-0 items-center justify-center w-8 h-8 '>
                    <img src={icon} className="w-auto h-auto min-w-full min-h-full" />
                </div>
                <div>
                    <h1 className="font-bold ml-4">{title}</h1>
                </div>
            </div>
            <div>
                <h1 className="text-gray-500">{data}</h1>
            </div>
        </div>

    )
}

export default DetailsRow