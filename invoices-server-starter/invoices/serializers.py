from rest_framework import serializers
from .models import Person, Countries, Invoice


class PersonSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(source="id", read_only=True)
    identification_number = serializers.CharField(default=None)

    class Meta:
        model = Person
        fields = [
            '_id', 'name', 'identification_number', 'tax_number', 'account_number',
            'bank_code', 'iban', 'telephone', 'mail', 'street', 'zip',
            'city', 'country', 'note'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if data['country'] == Countries.CZECHIA:
            data['country'] = 'CZECHIA'
        elif data['country'] == Countries.SLOVAKIA:
            data['country'] = 'SLOVAKIA'
        return data

    def delete(self, using=None, keep_parents=False):
        """
        Soft delete the person by setting hidden to True.
        Person is not actually deleted from the database.
        """
        self.hidden = True
        self.save()

    def update(self, instance, validated_data):
        """Update the person by creating a new instance in the database."""
        instance.hidden = True
        instance.save()
        validated_data.pop('hidden', None)
        return Person.objects.create(**validated_data, hidden=False)
    
    
class InvoiceSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(source="id", read_only=True)
    
    seller = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all())
    buyer = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all())

    class Meta:
        model = Invoice
        fields = [
            '_id', 'invoice_number', 'issued', 'due_date', 'product', 'price',
            'vat', 'note', 'buyer', 'seller'
        ]
        
    def to_internal_value(self, data):
        if isinstance(data.get('seller'), dict) and '_id' in data['seller']:
            data['seller'] = data['seller']['_id']
        if isinstance(data.get('buyer'), dict) and '_id' in data['buyer']:
            data['buyer'] = data['buyer']['_id']
        return super().to_internal_value(data)

    def to_representation(self, instance):
        """
        Insert the buyer and seller into the invoice representation.
        This is used to display and differenciate which person was buyer and seller in the response
        by fetching person data inside invoice data.
        """
        data = super().to_representation(instance)
        data['buyer'] = PersonSerializer(instance.buyer).data
        data['seller'] = PersonSerializer(instance.seller).data
        return data
    
