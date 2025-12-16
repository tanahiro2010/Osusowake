interface TableProps {
    items: { label: string; value: string, link?: string }[];
}

export function Table({ items }: TableProps) {
    return (
        <div id="table">
            {items.map((item, index) => (
                <div className="flex text-lg font-medium" key={index}>
                    <div className="w-1/2 border-b border-gray-300">
                        { item.label }
                    </div>
                    <div className="w-1/2 border-b border-gray-300">
                        { item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                                { item.value?.trim() === '' ? '設定されていません' : item.value }
                            </a>
                        ) : (
                            <>{ item.value?.trim() === '' ? '設定されていません' : item.value }</>
                        ) }
                    </div>
                </div>
            ))}
        </div>
    );
}