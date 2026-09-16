import Image from 'next/image';

export default function Logo({ className }: LogoProps) {
    const logoUrl = null;
    //const logoUrl = await fetchLogoUrl();

    return (
        <>
            <Image
                src={logoUrl ? logoUrl : '/churchLogo.svg'}
                alt="☦ Orthodox Church Logo"
                width={150}
                height={50}
                priority
            />
        </>
    );
}


// <svg
//     xmlns="http://www.w3.org/2000/svg"
//     // viewBox="0 0 100 100"
//     viewBox="0 0 150 150"
//     className={className}
//     id="svg4"
//     overflow="visible"
//     preserveAspectRatio="xMinYMin meet"
// >
//     {/* Shapes matching your vector graphics structure */}
//     <rect width="195" height="70" x="2.5" y="200" fill="currentColor" rx="25" id="rect1" />
//     <circle r="70" cx="100" cy="190" fill="currentColor" id="circle1" />
//     <rect width="10" height="150" x="93" y="25" fill="currentColor" rx="5" id="rect2" />
//     <rect width="90" height="10" x="53" y="40" fill="currentColor" rx="5" id="rect3" />
//     <rect width="50" height="10" x="-3" y="-20" fill="currentColor" rx="5" transform="translate(74,95) rotate(25)" id="rect4" />
//
//     {/* Example custom path using currentColor */}
//     <path d="M10 10 L 20 20" fill="currentColor" />
// </svg>