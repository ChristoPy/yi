const Template = require('../../../../src/compiler/parser/template')

test('[TEMPLATE] Parse template with nested tags', () => {
  const text = `<profile-area>
    <avatar src="profile.png"/>    
  </profile-area>`
  const expected = {
    'profile-area-0': {
      'avatar-0': {}
    }
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with nested tag and text', () => {
  const text = `
  <about-me> some crazy info here, please pretend I'm a great person!
  </about-me>
  `
  const expected = {
    'about-me-0': {
      'text-0': {}
    }
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with multiple spaces between tags', () => {
  const text = `<profile-area>        <avatar src="profile.png"/>    </profile-area>`
  const expected = {
    'profile-area-0': {
      'avatar-0': {}
    }
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with mixed spaces, tabs and newlines', () => {
  const text = `<profile-area>     
			  	
			<avatar src="profile.png"/>  			  </profile-area>
	  		
			`
  const expected = {
    'profile-area-0': {
      'avatar-0': {}
    }
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with nested tag and text', () => {
  const text = `
	<about-me> some crazy         info here, 					please 
								 
	 	pretend I'm a great person!
  </about-me>
  `
  const expected = {
    'about-me-0': {
      'text-0': {}
    }
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})
