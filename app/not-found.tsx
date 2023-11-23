import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '404 - Page not found',

}

export default function NotFound() {
return (
	<>
		<h1>Sorry page not found! 😿</h1>
		<p>404.</p>
		<p>{"You just hit a route that doesn't exist."}</p>
	</>
);
}