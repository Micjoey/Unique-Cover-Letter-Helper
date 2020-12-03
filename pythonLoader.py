import json
import sys

from psycopg2 import connect, Error


with open('db1.json') as json_data:

    try:
        # declare a new PostgreSQL connection object
        conn = connect(
            dbname="python_data",
            user="postgres",
            host="192.168.100.123",
            password="1234",
            # attempt to connect for 3 seconds then raise exception
            connect_timeout=3
        )

        cur = conn.cursor()
        print("\ncreated cursor object:", cur)

    except (Exception, Error) as err:
        print("\npsycopg2 connect error:", err)
        conn = None
        cur = None
