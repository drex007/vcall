import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer


class VcallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'Test_group'

        await self.channel_layer.group_add(
            self.room_group_name, 
            self.channel_name
            )

        await self.accept()

    async def receive(self, text_data):
        received_dict = json.loads(text_data)
        message = received_dict['message']

        # Send message to room group
        self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send.message', #send_message
                'message': message
            }
        )
    async def send_message(self,event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

        

    async def disconnect(self, close_code):

        await self.channel_layer.group.discard(
            self.room_group_name, 
            self.channel_name)

        print("Disconnected!")
        