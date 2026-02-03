export default function Button({ buttonName }) {
    return (
        <button className="w-full bg-primaryButton hover:bg-primaryHover px-4 py-2 rounded-lg cursor-pointer text-white font-inter font-medium transition">{buttonName}</button>
    )
}