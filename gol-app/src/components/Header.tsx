export default function Header() {
  return (
    <span className="flex gap-2 ml-20 mt-2">
      <h1 className="scroll-m-20  text-2xl font-extrabold tracking-tight text-balance">
        <a href="/">Game Of Life</a>
      </h1>
      <span className="scroll-m-20  text-2xl tracking-tight text-balance">
        |
      </span>
      <h3 className="scroll-m-20  text-2xl tracking-tight text-balance">
        <a href="/grids/">Gallery</a>
      </h3>
    </span>
  );
}
