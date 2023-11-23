import React from "react";
import useWeddingStart from "@/lib/useWeddingStart";

export default function WeddingStart() {
	const { timeAsDays } = useWeddingStart({
		update: 60000,
	});

	return (
		<span style={{ color: "#e64c44", fontSize: "3.157rem" }}>{timeAsDays}</span>
	);
}
