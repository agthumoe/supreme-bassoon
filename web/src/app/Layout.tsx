import { Nav } from "../components/Nav";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
      <footer>&copy; {new Date().getFullYear()} agthumoe</footer>
    </div>
  );
}