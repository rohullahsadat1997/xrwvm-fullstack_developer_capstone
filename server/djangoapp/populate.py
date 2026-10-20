from .models import CarMake, CarModel


def initiate():
    car_data = [
        {
            "make": "Toyota",
            "description": "Japanese automobile manufacturer",
            "models": [
                ("Camry", "Sedan", 2022),
                ("Corolla", "Sedan", 2021),
                ("RAV4", "SUV", 2023),
            ],
        },
        {
            "make": "Honda",
            "description": "Japanese automobile manufacturer",
            "models": [
                ("Civic", "Sedan", 2022),
                ("Accord", "Sedan", 2021),
                ("CR-V", "SUV", 2023),
            ],
        },
        {
            "make": "Ford",
            "description": "American automobile manufacturer",
            "models": [
                ("Focus", "Sedan", 2020),
                ("Explorer", "SUV", 2022),
                ("Escape", "SUV", 2023),
            ],
        },
        {
            "make": "BMW",
            "description": "German automobile manufacturer",
            "models": [
                ("320i", "Sedan", 2021),
                ("X3", "SUV", 2022),
                ("X5", "SUV", 2023),
            ],
        },
        {
            "make": "Volkswagen",
            "description": "German automobile manufacturer",
            "models": [
                ("Golf", "Wagon", 2021),
                ("Passat", "Sedan", 2022),
                ("Tiguan", "SUV", 2023),
            ],
        },
    ]

    for item in car_data:
        make, _ = CarMake.objects.get_or_create(
            name=item["make"],
            defaults={"description": item["description"]},
        )

        for model_name, car_type, year in item["models"]:
            CarModel.objects.get_or_create(
                car_make=make,
                name=model_name,
                defaults={
                    "dealer_id": 0,
                    "type": car_type,
                    "year": year,
                },
            )

    print("Car data populated successfully.")
