(function() {
  var tasks = [
    {
      id: 1,
      duration: 30,
      resources: [
        'A'
      ]
    },
    {
      id: 2,
      duration: 60,
      resources: [
        'B'
      ]
    }
  ],
  resources = [
    {
      id: 'A'
    },
    {
      id: 'B'
    }
  ];

  schedule.create(tasks, resources, null, new Date());
})();
