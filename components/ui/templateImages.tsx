import Image from "next/image"
import { useState } from "react"

export default function TemplateImages({ setImage = function () { } }: any) {
    const [images] = useState([
        { id: 1, uri: "https://i.pinimg.com/736x/a5/b6/14/a5b614c1975ed48ad4f4927194cc0d03.jpg" },
        { id: 2, uri: "https://i.pinimg.com/736x/e0/08/11/e0081100d4f1a60459716c3ebe0b40e2.jpg" },
        { id: 3, uri: "https://i.pinimg.com/736x/90/01/c4/9001c49e3f07b58079b7e996232b7397.jpg" },
        { id: 4, uri: "https://i.pinimg.com/736x/41/1a/75/411a75e6ce26301e1381c1bb51e35aa2.jpg" },
        { id: 5, uri: "https://i.pinimg.com/736x/f8/fb/c7/f8fbc71d5ddc970e4f1a34bb40c337c8.jpg" },
        { id: 6, uri: "https://i.pinimg.com/736x/94/43/ba/9443baeb6215a676acc5cafba5890024.jpg" },
        { id: 7, uri: "https://i.pinimg.com/736x/66/23/80/66238049cec9b0fe7e41a84cfecff559.jpg" },
        { id: 8, uri: "https://i.pinimg.com/736x/63/3b/3c/633b3c4b98015d299120d616897e4844.jpg" }
    ])
    const [current, setCurrent] = useState<number | null>(null)
    return <div className="lg:fixed relative z-40 mb-5 left-0 top-0 bottom-0 w-fit px-2 h-full flex lg:flex-col items-center justify-center">
        {images.map(function ({ uri, id }) {
            return <div key={id} className={`w-fit cursor-pointer`} onClick={function () {
                setImage(uri)
                setCurrent(id)
            }}>
                <Image style={{ objectFit: "cover" }} src={uri} height={60} width={60} alt="" className={`${current == id ? "h-[60px] w-[60px] lg:mx-0 mx-2 lg:my-2" : "lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] lg:mx-[2px] mx-2 lg:my-[2px]"} bg-cover border-2 rounded-lg border-black`} />
            </div>
        })}
    </div>
}