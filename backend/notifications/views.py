from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import send_contact_email


@api_view(['POST'])
def contact(request):
    """Handle contact form submissions."""
    name = request.data.get('name', '')
    email = request.data.get('email', '')
    phone = request.data.get('phone', '')
    message = request.data.get('message', '')

    if not all([name, email, message]):
        return Response(
            {'error': 'Name, email, and message are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    success = send_contact_email(name, email, phone, message)

    if success:
        return Response({'message': 'Message sent successfully'})
    return Response(
        {'error': 'Failed to send message'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )