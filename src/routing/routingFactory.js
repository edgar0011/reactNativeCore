import React from 'react'

export const factory = (Container, Screen, config) => {
  console.log('Routing Factory')
  const { screens, ...containerProps } = config
  return (
    <Container {...containerProps}>
      {screens && screens.map((screen) => (<Screen key={screen.name} {...screen} />))}
    </Container>
  )
}
