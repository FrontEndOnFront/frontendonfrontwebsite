import Link from "next/link"

export default function NotFound() {
  return (
    <section className="container-page py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tighter sm:text-6xl">This stop is off the line</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The page you are looking for has moved or never existed.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to the station
      </Link>
    </section>
  )
}
