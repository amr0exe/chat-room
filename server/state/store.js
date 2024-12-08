
/* state to store rooms, its clients, clients names
    rooms: { 'games' => Set(['ws1', 'ws2'])}
    clientRooms: { 'ws1' => Set(['games', 'chess'])}
    clientNames: {'ws1' => "Alice"}
*/
export const state = {
    rooms: new Map(),
    clientRooms: new Map(),
    clientNames: new Map()
}
