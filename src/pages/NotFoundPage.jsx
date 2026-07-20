import React from 'react'
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">404 error</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you requested does not exist or has moved.</p>
        <Link to="/" className="btn-brand mt-7">Return home</Link>
      </div>
    </main>
  )
}

export default NotFoundPage
