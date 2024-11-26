import asyncio
import websockets


async def handle_client(websocket):
    print("Client connected")
    try:

        with open('visualization/sample_server/sample.txt', mode='r') as f:

            line = f.readline()
            while line:
                await websocket.send(line)
                await asyncio.sleep(1)
                line = f.readline()

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")


async def start_server():
    server = await websockets.serve(handle_client, "localhost", 8765)
    print("WebSocket server  ws://localhost:8765")
    await server.wait_closed()


if __name__ == "__main__":
    asyncio.run(start_server())
