# Generated by Django 4.2.7 on 2024-03-04 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0003_alter_note_height_alter_note_width'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='font_size',
            field=models.CharField(default=14, max_length=3),
            preserve_default=False,
        ),
    ]
