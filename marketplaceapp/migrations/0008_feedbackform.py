# Generated by Django 3.2.6 on 2021-09-24 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplaceapp', '0007_pearlitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeedbackForm',
            fields=[
                ('submission_id', models.IntegerField(primary_key=True, serialize=False)),
                ('feedback_type', models.CharField(max_length=32)),
                ('feedback', models.TextField()),
            ],
            options={
                'db_table': 'feedback_forms',
                'managed': False,
            },
        ),
    ]
