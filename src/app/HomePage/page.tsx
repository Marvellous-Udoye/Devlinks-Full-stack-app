import Navbar from "../components/Navbar/Navbar";
import DisplayLink from "../components/Displaylinks/DisplayLink";
import CustomizeLinks from "../components/CustomizeLinks/CustomizeLinks";

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <section className="flex w-full">
        <DisplayLink />
        <CustomizeLinks />
      </section>
    </main>
  );
}