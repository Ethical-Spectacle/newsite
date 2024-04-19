import Authentication from "./components/Authentication"

function page() {
  return (
    <section className="h-screen flex justify-center bg-slate-100">
        <div className="boxed-container flex justify-center items-center">
            <Authentication />
        </div>
    </section>
  )
}

export default page