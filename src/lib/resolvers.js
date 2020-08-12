const courses = [
  {
    _id: '1',
    title: 'GraphQL Course',
    teacher: 'GNDX',
    description: 'GraphQL API',
    topic: 'Programming'
  },
  {
    _id: '2',
    title: 'JavaScript Course',
    teacher: 'Diego DeGranda',
    description: 'JavaScript Professional',
    topic: 'Programming'
  },
  {
    _id: '3',
    title: 'ReactJS Course',
    teacher: 'Sparragus',
    description: 'ReactJS Professional',
    topic: 'Programming'
  },
  {
    _id: '4',
    title: 'Web Online Development Course',
    teacher: 'Leonidas Esteban',
    description: 'Develop your own website',
    topic: 'Programming'
  }
]

module.exports = {
  Query: {
    //Return all the courses
    getCourses: () => {
      return courses;
    },
    getCourse: (root, args) => {
      const course = courses.find(course => course._id === args.id);
      return course;
    }
  }
}