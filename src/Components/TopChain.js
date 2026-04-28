const TopChain = ({ restaurants = [] }) => {
    const topChains = restaurants
        .map((restaurant) => restaurant?.info?.name)
        .filter(Boolean)
        .slice(0, 10);

    if (topChains.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-5 text-sm text-gray-500">
                Top chain data is currently unavailable.
            </div>
        );
    }

    return (
        <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-800">Top Chain Restaurants</h2>
            <p className="mt-1 text-sm text-gray-500">Popular picks you can explore quickly</p>

            <div className="mt-4 flex flex-wrap gap-3">
                {topChains.map((chainName) => (
                    <span
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                        key={chainName}
                    >
                        {chainName}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TopChain;
