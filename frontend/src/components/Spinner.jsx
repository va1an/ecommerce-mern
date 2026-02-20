export default function Spinner() {
    return (
        <div className="bg-black/50 min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
    )
}