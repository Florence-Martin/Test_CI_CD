# permet de se connecter à une base de données PostgreSQL et d'exécuter des commandes SQL
import psycopg2
import os
# framework de test pour Python
import pytest

@pytest.fixture
def db_connection():
    conn = psycopg2.connect(
        dbname=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD'),
        host=('DB_HOST'),
        port='5432'
    )
    yield conn
    conn.close()

def test_user_table(db_connection):
    cur = db_connection.cursor()

    # Vérification de l'existence de la table
    cur.execute("SELECT * FROM information_schema.tables WHERE table_name='user';")
    table_exists = cur.fetchone() is not None
    assert table_exists, "La table 'user' n'existe pas."

    # Vérification des données insérées
    cur.execute('SELECT * FROM "user";')
    rows = cur.fetchall()
    assert len(rows) == 3, "Le nombre de lignes dans la table 'user' n'est pas correct."

    expected_data = [
        (1, 'John', 'Doe', 30),
        (2, 'Jane', 'Doe', 25),
        (3, 'Alice', 'Smith', 15)
    ]

    for i, row in enumerate(rows):
        assert row == expected_data[i], f"La ligne {i+1} ne correspond pas aux données attendues. Attendu: {expected_data[i]}, Reçu: {row}"

    cur.close()

if __name__ == '__main__':
    pytest.main()
