--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Debian 15.8-1.pgdg120+1)
-- Dumped by pg_dump version 15.8 (Debian 15.8-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_movie_source_status; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public.enum_movie_source_status AS ENUM (
    'enabled',
    'disabled'
);


ALTER TYPE public.enum_movie_source_status OWNER TO root;

--
-- Name: enum_moviesource_status; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public.enum_moviesource_status AS ENUM (
    'enabled',
    'disabled'
);


ALTER TYPE public.enum_moviesource_status OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Movie; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Movie" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "releaseDate" character varying(255),
    director character varying(255),
    "movieRating" character varying(255),
    "movieRuntime" character varying(255),
    "posterImage" character varying(255),
    synopsis text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Movie" OWNER TO root;

--
-- Name: MovieRating; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."MovieRating" (
    id integer NOT NULL,
    "movieId" integer NOT NULL,
    url character varying(255) NOT NULL,
    source character varying(255) NOT NULL,
    "ratingScore" double precision DEFAULT '0'::double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."MovieRating" OWNER TO root;

--
-- Name: MovieRating_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."MovieRating_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MovieRating_id_seq" OWNER TO root;

--
-- Name: MovieRating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."MovieRating_id_seq" OWNED BY public."MovieRating".id;


--
-- Name: Movie_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Movie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Movie_id_seq" OWNER TO root;

--
-- Name: Movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Movie_id_seq" OWNED BY public."Movie".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO root;

--
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO root;

--
-- Name: UserAclRole; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserAclRole" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserAclRole" OWNER TO root;

--
-- Name: UserAclRole_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."UserAclRole_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserAclRole_id_seq" OWNER TO root;

--
-- Name: UserAclRole_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."UserAclRole_id_seq" OWNED BY public."UserAclRole".id;


--
-- Name: UserRole; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserRole" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserRole" OWNER TO root;

--
-- Name: UserRole_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."UserRole_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserRole_id_seq" OWNER TO root;

--
-- Name: UserRole_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."UserRole_id_seq" OWNED BY public."UserRole".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO root;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Movie id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Movie" ALTER COLUMN id SET DEFAULT nextval('public."Movie_id_seq"'::regclass);


--
-- Name: MovieRating id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."MovieRating" ALTER COLUMN id SET DEFAULT nextval('public."MovieRating_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserAclRole id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAclRole" ALTER COLUMN id SET DEFAULT nextval('public."UserAclRole_id_seq"'::regclass);


--
-- Name: UserRole id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserRole" ALTER COLUMN id SET DEFAULT nextval('public."UserRole_id_seq"'::regclass);


--
-- Data for Name: Movie; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Movie" (id, title, "releaseDate", director, "movieRating", "movieRuntime", "posterImage", synopsis, "createdAt", "updatedAt") FROM stdin;
1	Casper	May 26, 1995	Brad Silberling	PG	1h 40m	https://m.media-amazon.com/images/M/MV5BZmQzZThjNDQtMjAxNC00YzhjLWFkNmItZDg4NjkxNjZkMjMxXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_QL75_UX190_CR0,1,190,281_.jpg	An afterlife therapist and his daughter meet a friendly young ghost when they move into a crumbling mansion in order to rid the premises of wicked spirits.An afterlife therapist and his daughter meet a friendly young ghost when they move into a crumbling mansion in order to rid the premises of wicked spirits.An afterlife therapist and his daughter meet a friendly young ghost when they move into a crumbling mansion in order to rid the premises of wicked spirits.	2024-08-30 11:40:32.749+00	2024-08-30 11:40:32.749+00
2	Drop Dead Fred	May 24, 1991	Ate de Jong	PG-13	1h 43m	https://m.media-amazon.com/images/M/MV5BOGZmZGE5YzQtOTFlOS00NmZiLWI3YTYtMjNiZmU4ZTM5MDY5XkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg	A young woman finds her already unstable life rocked by the presence of a rambunctious imaginary friend from childhood.A young woman finds her already unstable life rocked by the presence of a rambunctious imaginary friend from childhood.A young woman finds her already unstable life rocked by the presence of a rambunctious imaginary friend from childhood.	2024-08-30 11:41:21.57+00	2024-08-30 11:41:21.57+00
3	Dumb and Dumber	Dec 16, 1994	Peter Farrelly,Robert Farrelly	PG-13 (Off-Color Humor)	1h 46m	https://resizing.flixster.com/YayjdjnSwEW3ApleKwYsbccpIW4=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p16298_p_v8_ae.jpg	Imbecilic best friends Lloyd Christmas (Jim Carrey) and Harry Dunne (Jeff Daniels) stumble across a suitcase full of money left behind in Harry's car by Mary Swanson (Lauren Holly), who was on her way to the airport. The pair decide to go to Aspen, Colo., to return the money, unaware that it is connected to a kidnapping. As Harry and Lloyd -- who has fallen in love with Mary -- are pursued across the country by hired killers and police, they find both their friendship and their brains tested.	2024-08-30 11:44:48.093+00	2024-08-30 11:44:48.093+00
4	Stand by Me	Aug 22, 1986	Rob Reiner	R	1 h 29 m	https://resizing.flixster.com/rPl5Jenn68NFcSNq8kklgXmbdkA=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9417_p_v10_ay.jpg	Stand by Me's screenplay by Raynold Gideon and Bruce A. Evans is based on Stephen King's novella "The Body," a somewhat autobiographical account of an overnight hike by four Oregon youngsters to seek the body of a boy who had been struck by a train. [New York Times]	2024-08-30 11:46:22.03+00	2024-08-30 11:54:00.844+00
5	Toy Story	Nov 22, 1995	John Lasseter	G	1 h 21 m	https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_QL75_UX190_CR0,1,190,281_.jpg	Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences. [Pixar]	2024-08-30 11:56:36.2+00	2024-08-30 11:56:39.313+00
\.


--
-- Data for Name: MovieRating; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."MovieRating" (id, "movieId", url, source, "ratingScore", "createdAt", "updatedAt") FROM stdin;
1	1	https://www.imdb.com/title/tt0112642	IMDb	6.2	2024-08-30 11:40:35.617+00	2024-08-30 11:40:35.617+00
2	1	https://www.rottentomatoes.com/m/casper	Rotten Tomatoes	5.2	2024-08-30 11:40:35.664+00	2024-08-30 11:40:35.664+00
3	1	https://www.metacritic.com/movie/casper/	Meta Critic	4.9	2024-08-30 11:40:35.693+00	2024-08-30 11:40:35.693+00
4	2	https://www.imdb.com/title/tt0101775	IMDb	5.9	2024-08-30 11:41:21.592+00	2024-08-30 11:41:22.772+00
5	2	https://www.rottentomatoes.com/m/drop_dead_fred	Rotten Tomatoes	1.1	2024-08-30 11:41:21.61+00	2024-08-30 11:41:22.792+00
6	2	https://www.metacritic.com/movie/drop-dead-fred/	Meta Critic	2.5	2024-08-30 11:41:21.624+00	2024-08-30 11:41:22.804+00
7	3	https://www.rottentomatoes.com/m/dumb_and_dumber	Rotten Tomatoes	6.8	2024-08-30 11:44:48.109+00	2024-08-30 11:44:48.109+00
8	3	https://www.imdb.com/title/tt0109686	IMDb	7.3	2024-08-30 11:44:48.131+00	2024-08-30 11:44:48.131+00
9	3	https://www.metacritic.com/movie/dumb-and-dumber/	Meta Critic	4.1	2024-08-30 11:44:48.157+00	2024-08-30 11:44:48.157+00
11	4	https://www.imdb.com/title/tt0092005	IMDb	8.1	2024-08-30 11:46:22.094+00	2024-08-30 11:46:22.094+00
10	4	https://www.metacritic.com/movie/stand-by-me/	Meta Critic	7.5	2024-08-30 11:46:22.044+00	2024-08-30 11:50:57.146+00
12	4	https://www.rottentomatoes.com/m/stand_by_me_1986	Rotten Tomatoes	9.2	2024-08-30 11:46:22.111+00	2024-08-30 11:55:16.278+00
13	5	https://www.metacritic.com/movie/toy-story/	Meta Critic	9.6	2024-08-30 11:56:39.29+00	2024-08-30 11:56:39.29+00
14	5	https://www.imdb.com/title/tt0114709/	IMDb	8.3	2024-08-30 11:56:39.322+00	2024-08-30 11:56:39.322+00
15	5	https://www.rottentomatoes.com/m/toy_story	Rotten Tomatoes	10	2024-08-30 11:56:39.346+00	2024-08-30 11:56:39.346+00
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240826152923-create-user-table.js
20240826153713-create-user-role-table.js
20240826153927-create-user-acl-role-table.js
20240827021932-movie-table.js
20240827022403-movie-rating-table.js
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."User" (id, email, password, "createdAt", "updatedAt") FROM stdin;
1	system@comeback.com	$2b$10$ZXGWfbjpq64tlK8eFlZv8uw8F34Z/Q/rMqu0ZSzMgddNtuXGkM5TK	2024-08-30 11:37:18.632+00	2024-08-30 11:37:18.632+00
2	admin@comeback.com	$2b$10$pF8lec3p4e551vg22YT3l.w6hMXOl/89FHVmzUesWCRf5/wekM.nC	2024-08-30 11:39:36.766+00	2024-08-30 11:39:36.766+00
\.


--
-- Data for Name: UserAclRole; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserAclRole" (id, "userId", "roleId", enabled, "createdAt", "updatedAt") FROM stdin;
1	1	1	t	2024-08-30 11:37:18.718+00	2024-08-30 11:37:18.718+00
2	2	2	t	2024-08-30 11:39:36.895+00	2024-08-30 11:39:36.895+00
\.


--
-- Data for Name: UserRole; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserRole" (id, name, description, "createdAt", "updatedAt") FROM stdin;
1	system	System user role for app integrations	2024-08-30 11:37:18.158+00	2024-08-30 11:37:18.158+00
2	admin	User role for admin users	2024-08-30 11:37:18.158+00	2024-08-30 11:37:18.158+00
3	user	User role for common users	2024-08-30 11:37:18.158+00	2024-08-30 11:37:18.158+00
\.


--
-- Name: MovieRating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."MovieRating_id_seq"', 15, true);


--
-- Name: Movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Movie_id_seq"', 5, true);


--
-- Name: UserAclRole_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."UserAclRole_id_seq"', 2, true);


--
-- Name: UserRole_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."UserRole_id_seq"', 3, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: MovieRating MovieRating_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."MovieRating"
    ADD CONSTRAINT "MovieRating_pkey" PRIMARY KEY (id);


--
-- Name: Movie Movie_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Movie"
    ADD CONSTRAINT "Movie_pkey" PRIMARY KEY (id);


--
-- Name: Movie Movie_title_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Movie"
    ADD CONSTRAINT "Movie_title_key" UNIQUE (title);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: UserAclRole UserAclRole_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAclRole"
    ADD CONSTRAINT "UserAclRole_pkey" PRIMARY KEY (id);


--
-- Name: UserRole UserRole_name_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_name_key" UNIQUE (name);


--
-- Name: UserRole UserRole_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY (id);


--
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: movie_rating_movie_id; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX movie_rating_movie_id ON public."MovieRating" USING btree ("movieId");


--
-- Name: movie_rating_movie_id_source; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX movie_rating_movie_id_source ON public."MovieRating" USING btree ("movieId", source);


--
-- Name: movie_rating_rating_score; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX movie_rating_rating_score ON public."MovieRating" USING btree ("ratingScore");


--
-- Name: user_acl_role_role_id_user_id; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX user_acl_role_role_id_user_id ON public."UserAclRole" USING btree ("roleId", "userId");


--
-- Name: user_email_password; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX user_email_password ON public."User" USING btree (email, password);


--
-- Name: MovieRating MovieRating_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."MovieRating"
    ADD CONSTRAINT "MovieRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movie"(id);


--
-- Name: UserAclRole UserAclRole_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAclRole"
    ADD CONSTRAINT "UserAclRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."UserRole"(id);


--
-- Name: UserAclRole UserAclRole_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAclRole"
    ADD CONSTRAINT "UserAclRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id);


--
-- PostgreSQL database dump complete
--

