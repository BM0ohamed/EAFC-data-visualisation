import React from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <img
          alt="EA Sports Logo"
          className="h-10"
          height="40"
          src="/placeholder.svg"
          style={{
            aspectRatio: "40/40",
            objectFit: "cover",
          }}
          width="40"
        />
        <h1 className="text-xl font-bold">FC24</h1>
        <div className="flex space-x-4">
          <a className="hover:text-gray-300" href="#">
            About
          </a>
          <a className="hover:text-gray-300" href="#">
            Features
          </a>
          <a className="hover:text-gray-300" href="#">
            Ultimate Team
          </a>
          <a className="hover:text-gray-300" href="#">
            Ultimate Team Hub
          </a>
          <a className="hover:text-gray-300" href="#">
            FC 24 Ratings
          </a>
          <a className="hover:text-gray-300" href="#">
            News & Community
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a className="hover:text-gray-300" href="#">
          Help
        </a>
        <a className="hover:text-gray-300" href="#">
          Account
        </a>
        <Button className="bg-green-600 hover:bg-green-700">Buy Now</Button>
      </div>
    </nav>
  )
}
