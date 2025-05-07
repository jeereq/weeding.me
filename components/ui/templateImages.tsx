import Image from "next/image"
import { useState } from "react"

export default function TemplateImages({ setImage = function () { } }: any) {
    const [images] = useState([
        { id: 1, uri: "https://i.pinimg.com/736x/a5/b6/14/a5b614c1975ed48ad4f4927194cc0d03.jpg" },
        { id: 2, uri: "https://i.pinimg.com/736x/e0/08/11/e0081100d4f1a60459716c3ebe0b40e2.jpg" },
        { id: 3, uri: "https://i.pinimg.com/736x/e0/08/11/e0081100d4f1a60459716c3ebe0b40e2.jpg" },
        { id: 4, uri: "https://i.pinimg.com/736x/41/1a/75/411a75e6ce26301e1381c1bb51e35aa2.jpg" },
        { id: 5, uri: "https://i.pinimg.com/736x/e0/08/11/e0081100d4f1a60459716c3ebe0b40e2.jpg" }
    ])
    return <div className="lg:fixed z-40 left-0 top-0 bottom-0 w-fit px-2 h-full flex lg:flex-col items-center justify-center">
        {images.map(function ({ uri }) {
            return <div className="w-fit p-2 cursor-pointer" onClick={function () {
                setImage(uri)
            }}>
                <Image style={{ objectFit: "cover" }} src={uri} height={60} width={60} alt="" className="pt-2 h-[60px] w-[60px] bg-cover" />
            </div>
        })}
    </div>
}