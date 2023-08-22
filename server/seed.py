#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import pdb

# Remote library imports
from faker import Faker

fake = Faker()
# Local imports
from app import app
from config import db
from models import User, Post, Location, Image
from ipdb import set_trace


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Deleting all records...")
        User.query.delete()
        Post.query.delete()
        Image.query.delete()
        Location.query.delete()

        image_urls = [
            'my_phase_4_pictures/rome.jpeg',
            'my_phase_4_pictures/rome2.jpeg',
            'my_phase_4_pictures/venice.jpeg',
            'my_phase_4_pictures/St.-Petersburg-at-night.jpg',
            'my_phase_4_pictures/moscow.jpeg',
            'my_phase_4_pictures/rio.jpeg',
            'my_phase_4_pictures/budapest.jpeg',
            'my_phase_4_pictures/newyork.jpeg',
            'my_phase_4_pictures/topic-london-gettyimages-760251843-feature.jpeg'
        ]
        titles = [
            'Rio de Janeiro Revealed: Exploring the Marvels of Brazil`s Vibrant City"',
            'Budapest Unveiled: Discovering the Beauty and Culture of the Pearl of Budapest',
            'Exploring New York: The Heart of the Big Apple',
            'Discovering London: A Closer Look at the UK`s Capital'
        ]

        descriptions = [
            "Rome, the eternal city, stands as a timeless testament to the grandeur of human history. With its roots stretching back over two and a half millennia, Rome is a living museum of ancient wonders, architectural marvels, and cultural treasures. Nestled along the banks of the Tiber River in the heart of Italy, this city has been a crucible of civilization, giving birth to the Roman Republic and later the Roman Empire, which exerted an indelible influence on Western culture and governance. From the awe-inspiring Colosseum, where gladiators once clashed, to the majestic domes of St. Peter's Basilica in Vatican City, Rome offers a sensory journey through time. Its narrow cobblestone streets, bustling piazzas, and tantalizing trattorias invite visitors to immerse themselves in the modern Italian way of life, while the haunting ruins of the Roman Forum and the iconic Pantheon remind us of the city's ancient origins. Whether you're wandering through the Vatican Museums to witness the sublime Sistine Chapel ceiling or savoring gelato by the Spanish Steps, Rome's blend of antiquity and vitality promises an unforgettable experience for every traveler.",
            "Venice, a city like no other, emerges as a floating masterpiece in the heart of the Venetian Lagoon. Built upon a network of canals that replace streets, this enchanting Italian jewel exudes an air of timeless elegance. Its labyrinthine alleys, ornate bridges, and graceful architecture create an ethereal atmosphere, as if suspended between reality and dreams. St. Mark`s Square, adorned with the stunning Basilica di San Marco and the iconic Campanile, offers a glimpse into Venice`s opulent past as a maritime superpower. Gondolas gracefully navigate the narrow waterways, evoking a sense of romance that has captivated generations. The city`s artistry is evident in the works of Titian, Tintoretto, and Canaletto, displayed in the Gallerie dell`Accademia and the Peggy Guggenheim Collection. As twilight casts a magical glow on the facades, Venices allure reaches its pinnacle. With the ebb and flow of the tides, this aquatic marvel continues to beckon travelers from around the world to experience its unique, poetic charm.",
            "Saint Petersburg, a city born from the visionary dreams of Peter the Great, stands as a testament to imperial splendor and cultural innovation. Built on a marshy delta at the edge of the Baltic Sea, this Russian gem showcases a captivating blend of European elegance and Russian heritage. Its grand avenues and baroque facades are graced by the glistening waters of the Neva River and an intricate network of canals, earning it the nickname `Venice of the North.` The city's historical significance is evident in the majestic Winter Palace, once the residence of Russian tsars and now part of the legendary Hermitage Museum, which houses a staggering collection of art and artifacts spanning centuries. From the golden spires of the Peter and Paul Fortress to the pastel hues of the Church of the Savior on Spilled Blood, Saint Petersburg's architecture is a visual feast. The city's cultural vibrancy is further enriched by the Mariinsky Theatre, where Tchaikovsky's compositions once echoed, and by the literary legacy of Fyodor Dostoevsky and Alexander Pushkin. As you stroll along the avenues and bridges, you'll feel the echoes of history and creativity, making Saint Petersburg a city that enchants with every step.",
            "Moscow, the sprawling capital of Russia, stands as a testament to the country's rich history and contemporary dynamism. Dominated by the iconic silhouette of the Kremlin, this city has witnessed centuries of political intrigue, cultural evolution, and architectural innovation. Red Square, flanked by the candy-colored domes of St. Basil's Cathedral and the formidable walls of the Kremlin, serves as the heart of Moscow and a focal point of national identity. Beyond its historic landmarks, Moscow boasts an impressive collection of art and culture, with the Tretyakov Gallery housing a vast array of Russian masterpieces. The city's bustling streets are a juxtaposition of modern glass skyscrapers and Soviet-era buildings, a reflection of Russia's multifaceted identity. As the Moskva River winds its way through the urban landscape, Moscow's energy is palpable, from the fervor of its residents to the grand performances at the Bolshoi Theatre. This city continues to evolve, offering a glimpse into both Russia's past and its future on the global stage.",
            "Nestled between lush mountains and the sparkling Atlantic Ocean, Rio de Janeiro is a city of unparalleled beauty and vibrant energy. Known for its iconic landmarks such as the towering Christ the Redeemer statue atop Corcovado Mountain and the golden shores of Copacabana and Ipanema beaches, Rio is a place where natural wonders harmonize with urban life. The city's rhythm pulses through its streets, from the samba beats that echo in lively street parties to the colorful parades of Carnival, a spectacle that captures the world's imagination. Overlooking Guanabara Bay, Sugarloaf Mountain offers panoramic vistas that reveal the city's juxtaposition of favelas against opulent neighborhoods. Rio's rich cultural tapestry is woven from a blend of Portuguese colonial history, African heritage, and indigenous influences, creating a diverse mosaic that is celebrated in its food, music, and art. As the sun sets behind the dramatic peaks, casting a golden glow over the city, Rio de Janeiro remains a place where nature's beauty and human creativity intertwine, leaving an indelible mark on all who experience its enchantment.",
            "Budapest, the enchanting capital of Hungary, is a city that seamlessly weaves together a tapestry of history, culture, and stunning architecture. Divided by the majestic Danube River, Budapest is a tale of two cities: Buda, with its medieval castles and hills offering panoramic views, and Pest, the bustling urban center alive with vibrant neighborhoods and grand boulevards. The city's thermal baths, like the iconic Széchenyi and Gellért Baths, speak to its Roman and Ottoman roots, providing a soothing retreat for both locals and visitors. The Hungarian Parliament Building, a neo-Gothic masterpiece, graces the banks of the Danube, while the Fisherman's Bastion and Matthias Church atop Castle Hill present a fairytale-like skyline. Walking along the Chain Bridge, you're transported between the old and the new, reflecting Budapest's enduring spirit as it transitions from ancient roots to a modern metropolis. With its rich history, inviting cafés, and a dynamic arts scene, Budapest invites exploration and discovery around every corner.",
            "New York, the city that never sleeps, pulses with an energy and diversity that are as iconic as its skyline. As the epicenter of finance, culture, and innovation, New York City stands as a global melting pot where dreams are pursued against the backdrop of towering skyscrapers and bustling streets. From the neon lights of Times Square to the serene expanse of Central Park, every corner of this metropolis holds a unique story. The Statue of Liberty, a symbol of hope and freedom, stands tall in New York Harbor, while the Empire State Building and One World Trade Center touch the sky, reminding us of human ambition and resilience. The neighborhoods – from the artsy enclaves of SoHo to the historic charm of Brooklyn – paint a portrait of a city with countless facets, where cultures collide and creativity thrives. With Broadway theaters, world-class museums, and an unparalleled culinary scene, New York's dynamism leaves an indelible mark on all who experience its kinetic energy and unmatched vibrancy.",
            "London, a city steeped in history and modernity, is a captivating blend of tradition and innovation. From the regal palaces of Buckingham and Kensington to the cutting-edge architecture of the Shard and the Gherkin, London's skyline mirrors its evolution through time. The River Thames flows as a witness to centuries of stories, with Tower Bridge and the iconic Big Ben standing as sentinels of its past. The British Museum, a treasure trove of global heritage, and the contemporary Tate Modern showcase London's commitment to both preserving history and embracing the avant-garde. As red double-decker buses navigate winding streets and black cabs traverse bustling intersections, the city's rhythm resonates with a cosmopolitan pulse. From the world-class shopping of Oxford Street to the cozy charm of Notting Hill's colorful houses, London's neighborhoods each have a distinct personality. This city of foggy charm and cultural magnetism continues to attract dreamers, professionals, and seekers of the extraordinary, offering a timeless allure that captivates all who venture into its midst."

        ]


        users = []

        # Create and add users to the database
        for i in range(70):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                countryOfBirth=fake.country()
            )
            db.session.add(user)
            users.append(user)

        db.session.commit()

        # Create and add posts to the database
        posts = []

        italyPost = Post(
            title="Exploring Italy: From Rome to Venice",
            content=descriptions[0] + "\n\n" + descriptions[1],
            user_id=rc(users).id
        )
        russiaPost = Post(
            title="Discovering Russia: From Saint Petersburg to Moscow",
            content=descriptions[2] + "\n\n" + descriptions[3],
            user_id=rc(users).id
        )
        db.session.add_all([italyPost, russiaPost])

        # Create and add remaining posts to the database
        for title, description in zip(titles, descriptions[4:]):
            post = Post(
                title=title,
                content=description,
                user_id=rc(users).id
            )
            posts.append(post)

        db.session.add_all(posts)
        db.session.commit()

        # Get the Italy post from the database
        italy_post = Post.query.filter_by(title="Exploring Italy: From Rome to Venice").first()

        # Create and associate images with the Italy post
        italy_images = [
            Image(url=image_urls[0]),
            Image(url=image_urls[1]),
            Image(url=image_urls[2])
        ]
        italy_post.images.extend(italy_images)

        db.session.add(italy_post)
        db.session.commit()

        # Get the Russia post from the database
        russia_post = Post.query.filter_by(title="Discovering Russia: From Saint Petersburg to Moscow").first()

        # Create and associate images with the Russia post
        russia_images = [
            Image(url=image_urls[3]),
            Image(url=image_urls[4])
        ]
        russia_post.images.extend(russia_images)

        db.session.add(russia_post)
        db.session.commit()

        # Associate remaining images with their respective posts
        for post, url in zip(posts, image_urls[5:]):
            # set_trace()
            image = Image(
                url=url
            )
            post.images.append(image)
            db.session.add(post)
        
            db.session.commit()

