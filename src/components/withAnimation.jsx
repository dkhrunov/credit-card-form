import React from 'react';

const withAnimation = (Component, AnimationWrapper) => (
	({ delay=0, duration=1000, when, left=false, right=false, top=false, bottom=false, ...other }) => (
		<AnimationWrapper
			delay={delay}
			duration={duration}
			when={when}
			left={left}
			right={right}
			top={top}
			bottom={bottom}
		>
			<Component { ...other }/>
		</AnimationWrapper>
	)
)

export default withAnimation;