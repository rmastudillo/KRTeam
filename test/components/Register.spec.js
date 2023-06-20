import { shallowMount } from '@vue/test-utils';
import Register from '@/components/register/RegisterPage.vue'; 

// Mockea el router y el fetch
jest.mock('vue-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe('RegisterPage.vue', () => {
  it('calls register when register button is clicked', async () => {
    const wrapper = shallowMount(Register);

    // Encuentra el botón y simula un click
    const button = wrapper.find('button');
    await button.trigger('click');

    // Comprueba si la función de registro fue llamada
    expect(global.fetch).toHaveBeenCalled();
  });
});
