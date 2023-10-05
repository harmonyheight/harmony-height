const stats = [
    { id: 1, name: 'Properties SOLD', value: '20,100' },
    { id: 2, name: 'Properties BOUGHT', value: '3,205' },
    { id: 3, name: 'Properties RENTED', value: '1,496' },
]

export default function Statistic() {
    return (
        <div className="flex justify-center items-center bg-lime-50 py-7 flex-col">

            <div className="flex justify-center items-center flex-col my-4">
                <h3 className="font-bold text-gray-900 text-2xl uppercase">Harmony heigth STATistic</h3>
                <span className="text-clip text-right w-full align-super py-4">We are growing rapidly. Let join us in our incredible journey</span>
            </div>
            <div className="bg-primary w-[95%] rounded-md py-6 sm:py-8">

                <div className="mx-auto max-w-7xl ">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 ">
                        {stats.map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-6 text-gray-900 uppercase">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
