import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/quries";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;
	const params = { search: query || null };

	// const posts = await client.fetch(STARTUP_QUERY);
	const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

	// console.log(JSON.stringify(posts, null, 2));

	// 	{
	// 		_createdAt: new Date(),
	// 		views: 55,
	// 		author: { _id: 1, name: "John Doe" },
	// 		_id: 1,
	// 		description: "This is a description",
	// 		image:
	// 			"https://images.unsplash.com/photo-1634912314704-c646c586b131?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0",
	// 		category: "Robots",
	// 		title: "We Robots",
	// 	},
	// 	{
	// 		_createdAt: new Date(),
	// 		views: 30,
	// 		author: { _id: 2, name: "Elon " },
	// 		_id: 2,
	// 		description: "A startup by Elon ",
	// 		image:
	// 			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0",
	// 		category: "Tech",
	// 		title: "Elon s Tech Venture",
	// 	},
	// ];

	return (
		<>
			<section className="pink_container pattern">
				<h1 className="heading">
					Pitch your startup, <br /> Connects with entrepreneurs
				</h1>

				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
					Competitions.
				</p>
				<SearchForm query={query} />
			</section>

			<section className="section_container">
				<p className="text-30-semibold">
					{query ? `Search results for "${query}"` : "All Startups"}
				</p>
				<ul className="mt-7 card_grid">
					{posts.length > 0 ? (
						posts.map((post: StartupTypeCard) => (
							<StartupCard key={post._id} post={post} />
						))
					) : (
						<p className="no-results">No results found</p>
					)}
				</ul>
			</section>

			<SanityLive />
		</>
	);
}
