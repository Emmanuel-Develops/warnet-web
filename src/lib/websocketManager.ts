// import { WebSocket, WebSocketServer } from 'ws'
// import { Server as HttpServer } from 'http'
// import { parse } from 'url'

// class WebSocketManager {
//   private wss: WebSocketServer | null = null
//   private clients: Set<WebSocket> = new Set()

//   initialize(server: HttpServer) {
//     if (this.wss) {
//       console.log('WebSocketServer already initialized')
//       return
//     }

//     console.log('Initializing WebSocketServer')
//     this.wss = new WebSocketServer({ noServer: true })

//     server.on('upgrade', (request, socket, head) => {
//       const { pathname } = parse(request.url!)
//       console.log(`Upgrade request received for path: ${pathname}`)

//       if (pathname === '/api/websocket') {
//         console.log('Handling WebSocket upgrade')
//         this.wss!.handleUpgrade(request, socket, head, (ws) => {
//           this.wss!.emit('connection', ws, request)
//         })
//       } else {
//         console.log(`Ignoring upgrade for non-WebSocket path: ${pathname}`)
//         socket.destroy()
//       }
//     })

//     this.wss.on('connection', (ws: WebSocket) => {
//       console.log('New WebSocket connection established')
//       this.clients.add(ws)

//       ws.on('message', (message: string) => {
//         console.log('Received message:', message)
//       })

//       ws.on('close', () => {
//         console.log('WebSocket connection closed')
//         this.clients.delete(ws)
//       })

//       ws.on('error', (error) => {
//         console.error('WebSocket error:', error)
//       })
//     })

//     console.log('WebSocketServer initialization complete')
//   }

//   broadcast(message: any) {
//     const data = JSON.stringify(message)
//     console.log(`Broadcasting message to ${this.clients.size} clients:`, data)
//     this.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data)
//       }
//     })
//   }
// }

// export const wsManager = new WebSocketManager()