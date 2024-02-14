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
        <h1 className="text-xl font-bold">FC_Fut</h1>
        <div className="flex space-x-4">
          <a className="hover:text-gray-300" href="/">
            Page d&apos;accueil
          </a>
          <a className="hover:text-gray-300" href="player-stat-over-time">
            Statistiques détaillées
          </a>
          <a className="hover:text-gray-300" href="list-players">
            Liste des joueurs
          </a>
        </div>
      </div>
    </nav>
  )
}
