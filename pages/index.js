import Link from 'next/link'

export default function Home(){
    return(
        <div>
            <h1>This is my movie collection</h1>
            <Link href="/films">
            <button>Feature Films</button>
            </Link>
            <Link href="/music">
            <button>Music</button>
            </Link>
            <Link href="/tv">
            <button>TV Shows</button>
            </Link>
            <Link href="/wrestling">
            <button>Professional Wrestling</button>
            </Link>
        </div>
    )
}
