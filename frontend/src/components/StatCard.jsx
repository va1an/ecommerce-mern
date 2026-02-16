export default function StatCard({ title, value }) {
    return (
        <div className="bg-white p-6 shadow rounded">
            <h3 className="font-inter text-gray-500">{title}</h3>
            <p className="font-inter text-2xl font-bold mt-2">{value}</p>
        </div>
    )
}