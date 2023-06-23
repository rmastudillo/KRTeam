import { shallowMount } from '@vue/test-utils';
import Login from '../../src/components/login/LoginPage.vue';

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

describe('Login.vue', () => {
  it('calls login when login button is clicked', async () => {
    const wrapper = shallowMount(Login);

    // Encuentra el botón y simula un click
    const button = wrapper.find('button');
    await button.trigger('click');

    // Comprueba si la función de inicio de sesión fue llamada
    expect(global.fetch).toHaveBeenCalled();
  });
});
